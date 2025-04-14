const { default: mongoose } = require("mongoose");

const contactSchema = new mongoose.Schema({
             username : {
                type : String,
                require : true,
             },
             email : {
                type : String,
                require : true,
             },
             message : {
                type : String,
                require: true,
             }
});

const ContactForm = new mongoose.model("ContactUs", contactSchema);
module.exports = ContactForm; 