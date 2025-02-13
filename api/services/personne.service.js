const {Personne} = require("../models/personne.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

class PersonneService {
  create = async (body) => {
    try {
      const personne = new Personne(body)
      const nom = await Personne.findOne({nom: personne.nom})
      if (nom) throw {status: 403, message: 'Veuillez choisir un autre nom'}
      const mail = await Personne.findOne({mail: personne.mail})
      if (mail) throw {status: 403, message: 'Veuillez choisir un autre adresse mail'}
      personne.mot_de_passe = bcrypt.hashSync(personne.mot_de_passe, 10)
      await personne.save()
      personne.mot_de_passe = null
      return personne
    } catch (e) {
      throw e
    }
  }

  login = async ({mail, mot_de_passe}) => {
    try {
      const personne = await Personne.findOne({mail})
      if (!personne) throw {status: 404, message: 'Utilisateur invalide'}
      if (!bcrypt.compareSync(mot_de_passe, personne.mot_de_passe)) throw {
        status: 405,
        message: 'Mot de passe incorrect'
      }
      return jwt.sign({...personne, mot_de_passe: undefined}, process.env.SECRET)
    } catch (e) {
      throw e
    }

  }
  sendMailToClient = async (mailClient) => {
    try {
      let sender = nodemailer.createTransport({
        service: 'outlook',
        secure: false,
        port: 587,
        auth: {
          user: 'srovaniaina7@outlook.com',
          pass: 'syraxsyrax21'
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      let mailOptions = {
        from: 'srovaniaina7@outlook.com',
        to: 'rsitraka181@gmail.com',
        subject: 'Garglass : véhicule à récuperer',
        html: '<h1>GarGlass!</h1> ' +
          '<h3>Votre véhicule est réparé </h3>' +
          '<h3>Vous pouvez le récuperer</h3>'
      }
      await sender.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Email sent to ' + info.response);
      });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = {PersonneService}
