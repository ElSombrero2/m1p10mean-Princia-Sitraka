const {Reparation} = require("../models/reparation.model");
const {SousReparation} = require("../models/sousReparation.model");

class ReparationService {

  create = async (body) => {
    try {
      const reparation = new Reparation(body);
      await reparation.save();
      return reparation;
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }
  updateFinish = async (idReparation) => {
    try {
      const repUpdate = await Reparation.findOneAndUpdate({_id: idReparation}, {$set: {avancement: "terminée"}}, {new: true})
      return repUpdate;
    } catch (e) {
      throw e
    }
  }
  updateNoFinish = async (idReparation) => {
    try {
      const repUpdate = await Reparation.findOneAndUpdate({_id: idReparation}, {$set: {avancement: "en cours"}}, {new: true})
      return repUpdate;
    } catch (e) {
      throw e
    }
  }
  getReparations = async () => {
    try {
      const reparation = Reparation.find().populate({
        path: 'voiture',
        populate: {path: 'idClient'}
      });
      return reparation;
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }
  getReparation = async (idRep) => {
    try {
      const reparation = Reparation.findOne({_id: idRep}).populate({
        path: 'voiture',
        populate: {path: 'idClient'}
      });
      return reparation;
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }
  getSommeMontant = async (voitureId) => {
    try {
      const reparation = Reparation.aggregate([
        {$match: {voiture: voitureId}},
        {
          $lookup: {
            from: 'sousreparations',
            localField: '_id',
            foreignField: 'reparation',
            as: 'sousReparations'
          }
        },
        {$unwind: '$sousReparations'},
        {
          $group: {
            _id: '$_id',
            totalAmount: {$sum: '$sousReparations.montant'}
          }
        }]);

      return reparation;
    } catch (e) {
      console.log(e.message)
      throw e
    }
  }
}

module.exports = {ReparationService}
