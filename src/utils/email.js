import emailjs from "@emailjs/browser";

/**
 * Sends an email using EmailJS.
 *
 * @param {object} templateParams - The variables for the email template.
 * @returns {Promise} - Resolves if email sent successfully, rejects otherwise.
 */
export const sendEmail = (templateParams) => {
  console.log("Sending email with params:", templateParams);

  // let templateId;

  // if (templateParams.service === "Babysitting") {
  //   templateId = "template_aknmwuf";
  // } else if (templateParams.service === "Pets") {
  //   templateId = "template_puc8w1p";
  // } else {
  //   console.error("Unknown service type:", templateParams.service);
  //   return Promise.reject(new Error("Unknown service type"));
  // }

  return emailjs.send(
    "service_pxm6gjs",
    "template_e41g3xd",
    templateParams,
    "3r85K0EUe88llQpe1"
  );
};
