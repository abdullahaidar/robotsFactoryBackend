
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter)

//  controller
exports.getRobots = (req, res) => {
  try {
    // get all data
    const robots = db.get('robots').value();
    res.status(200).send(robots);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// add to database
exports.addRobot = (req, res, next) => {
  try {
    const robot = req.body
    db.get('robots')
      .push(robot)
      .last()
      .assign({ id: Date.now().toString() }, { posX: 0, posY: 0, heading: "north" }).write()
    res.status(201).send(robot)
  } catch (error) {
    console.log(error);
    next(error);
  }

};

// DELETE 
exports.deleteRobot = (req, res, next) => {
  try {
    const inputId = req.body.id;
    db.get('robots').remove({ id: inputId }).write();
    res.status(200).send('Success')
  } catch (error) {
    console.log(error);
    next(error);
  }

}


exports.turnLeft = (req, res, next) => {
  try {
    const robotID = req.body.id;
    const headingCheck = (heading) => {
      switch (heading) {
        case "north": return (heading = "west");
        case "west": return (heading = "south");
        case "south": return (heading = "east");
        case "east": return (heading = "north");
      }
    };
    const robots = db.get("robots").value();
    let robot = robots.find((robot) => robot.id === robotID);
    // console.log(robot);
    const newHeading = headingCheck(robot.heading);
    db.get("robots")
      .find({ id: robotID })
      .assign({ heading: newHeading })
      .write();
    res.send(robot);
  } catch (error) {
    console.log(error)
    next(error);
  }
};


exports.turnRight = (req, res, next) => {
  try {
    const robotID = req.body.id;
    const headingCheck = (heading) => {
      switch (heading) {
        case "north": return (heading = "east");
        case "east": return (heading = "south");
        case "south": return (heading = "west");
        case "west": return (heading = "north");
      }
    };
    const robots = db.get("robots").value();
    let robot = robots.find((robot) => robot.id === robotID);
    // console.log(robot);
    const newHeading = headingCheck(robot.heading);
    db.get("robots")
      .find({ id: robotID })
      .assign({ heading: newHeading })
      .write();
    res.send(robot);
  } catch (error) {
    console.log(error);
    next(error);
  }


};

exports.moveForward = (req, res, next) => {
  try {
    let robotId = req.body.id;
    const robots = db.get("robots").value();
    let robot = robots.find((robot) => robot.id === robotId);
    let posX = Number(robot.posX);
    let posY = Number(robot.posY);
    switch (robot.heading) {
      case "north":
        db.get("robots")
          .find({ id: robotId })
          .assign({ posY: posY + 1 })
          .write();
        break;
      case "east":
        db.get("robots")
          .find({ id: robotId })
          .assign({ posX: posX + 1 })
          .write();
        break;
      case "south":
        db.get("robots")
          .find({ id: robotId })
          .assign({ posY: posY - 1 })
          .write();
        break;
      case "west":
        db.get("robots")
          .find({ id: robotId })
          .assign({ posX: posX - 1 })
          .write();
        break;
      default:
        null;
    }
    res.status(200).send(robot);
  } catch (error) {
    console.log(error)
    next(error)
  }
};