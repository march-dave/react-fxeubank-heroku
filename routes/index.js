module.exports = (app, FxRate) => {
  // GET ALL FxRates
  app.get("/api/fxrate", (req, res) => {
    FxRate.find((err, fxrates) => {
      res.status(err ? 400 : 200).send(err || fxrates);
    });
  });

  app.post("/api/fxrate", (req, res) => {
    let fxrate = new FxRate(req.body);
    fxrate.save((err, saveRate) => {
      res.status(err ? 400 : 200).send(err || saveRate);
    });
  });

  // ### no required for this project but ref for the future ### //
  app.put('/api/fxrate/:id', (req, res) => {
    FxRate.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, fxrates) => {
      res.status(err ? 400 : 200).send(err || fxrates);
    });
  });

  app.delete("/api/fxrate/:id", (req, res) => {
    FxRate.findByIdAndRemove(req.params.id, (err, fxrates) => {
      res.status(err ? 400 : 200).send(err || fxrates);
    });
  });
  // ### no required for this project but ref for the future ### //

};
