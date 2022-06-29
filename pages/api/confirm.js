const confirm = (req, res) => {
  require("dotenv").config();

  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: process.env.CONTACT_SMTP_PORT,
    host: process.env.CONTACT_SMTP_HOST,
    auth: {
      user: process.env.CONTACT_BURNER_EMAIL,
      pass: process.env.CONTACT_BURNER_PASS,
    },
    secure: true,
  });

  const mailData = {
    from: `Nftism <${process.env.CONTACT_BURNER_EMAIL}>`,
    to: [`${req.body.email}`],
    subject: `New Contact Message (www.nftism.com)`,
    envelope: {
      from: `Nftism <${process.env.CONTACT_BURNER_EMAIL}>`,
      to: [`${req.body.email}`],
    },
    text: `${req.body.message}`,
    html: `
            <div>
                ${req.body.message}
            </div>
    `,
  };

  try {
    transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.log(`API ERROR: ${err} `);
        let message =
          "Unknown error was encountered while sending your message. Please try again after a few seconds.";
        if (err.code === "ESOCKET" || err.command === "CONN") {
          console.log(`
              FAILED TO CONNECT TO GSMTP via CONTACT FORM \n
              ${JSON.stringify({
                errno: err.errno,
                code: err.code,
                errmsg: err.message,
                syscall: err.syscall,
                address: err.address,
                port: err.port,
                command: err.command,
              })}
`);
        } else {
          console.log(err);
        }
        switch (err.code) {
          case "ESOCKET":
            message =
              "Could not connect to email service provider at the moment. Please try again after a few seconds.";
          default:
            null;
        }
        res.status(400).end(
          JSON.stringify({
            success: false,
            message: message,
            statusCode: 400,
          })
        );
      } else {
        res.end(
          JSON.stringify({
            success: true,
            message: "OK",
            statusCode: 200,
          })
        );
      }
    });
  } catch (e) {
    res.status(500).end();
  }
};

export default confirm;
