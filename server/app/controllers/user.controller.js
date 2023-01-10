const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

exports.allAccess = (req, res) => {
  res.status(200).send('Welcome! Dashboard.');
};

exports.userBoard = (req, res) => {
  const totalData = [];
  const csvPath = path.join(__dirname, '../../data/cpu_hours.csv');

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', function (data) {
      try {
        totalData.push({
          ymd: `${data.year}-${data.month}-${data.day}`,
          cpu_hours: data.cpu_hours,
        });
      } catch (err) {
        res.status(500).send('CSV Error.');
      }
    })
    .on('end', function () {
      res.status(200).send(totalData);
    });
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};
