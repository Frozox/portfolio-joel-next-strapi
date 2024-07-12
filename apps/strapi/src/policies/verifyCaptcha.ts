/**
 * verifyCaptcha policy
 */
import { errors } from "@strapi/utils";
import { verify } from "hcaptcha";
import Joi from "joi";
const { ApplicationError } = errors;

const CaptachaError = new ApplicationError(
  "Missing or invalid captcha",
  {
    code: "INVALID_CAPTCHA",
  }
)

export default async (policyContext, config, { strapi }) => {
  const HCaptchaResponse = policyContext.request.body.data.h_captcha_response;
  const { error } = Joi.string().required().validate(HCaptchaResponse);

  if (error) {
    throw CaptachaError;
  }

  const secret = strapi.config.get("server.hcaptchaSecret");

  let { success } = await verify(secret, HCaptchaResponse);

  if (!success) {
    throw CaptachaError;
  }

  return true;
};