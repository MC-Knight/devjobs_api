import Joi from "joi";
import { User, Job } from "../@types/types";
import { log } from "console";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{12,}$/;

const validateUser = (user: User): Joi.ValidationResult<any> => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required().messages({
      "any.required": "firstName is required.",
    }),
    lastName: Joi.string().min(3).max(50).required().messages({
      "any.required": "lastName is required.",
    }),
    email: Joi.string().min(5).max(255).required().email().messages({
      "any.required": "Email is required.",
    }),
    password: Joi.string()
      .pattern(PASSWORD_REGEX)
      .max(1024)
      .required()
      .messages({
        "string.pattern.base":
          "Password must be at least 12 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      }),
  });

  return schema.validate(user);
};

const validateLoginUser = (user: User): Joi.ValidationResult<any> => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email().messages({
      "any.required": "Email is required.",
    }),
    password: Joi.string()
      .pattern(PASSWORD_REGEX)
      .max(1024)
      .required()
      .messages({
        "any.required": "Password is required.",
      }),
  });

  return schema.validate(user);
};

const validateJob = (job: Job): Joi.ValidationResult<any> => {
  const schema = Joi.object({
    company: Joi.string().min(3).max(255).required().messages({
      "any.required": "Company is required.",
    }),
    logoBackground: Joi.string().min(3).max(255).required().messages({
      "any.required": "Logo background is required.",
    }),
    position: Joi.string().min(3).max(255).required().messages({
      "any.required": "Position is required.",
    }),
    contract: Joi.string().min(3).max(255).required().messages({
      "any.required": "Contract is required.",
    }),
    location: Joi.string().min(3).max(255).required().messages({
      "any.required": "Location is required.",
    }),
    website: Joi.string().min(3).required().messages({
      "any.required": "Website is required.",
    }),
    apply: Joi.string().min(3).required().messages({
      "any.required": "Apply is required.",
    }),
    description: Joi.string().min(3).required().messages({
      "any.required": "Description is required.",
    }),
    logo: Joi.string().allow('').messages({
      "any.required": "Logo is required.",
    }),
  });

  return schema.validate(job);
};
export { validateUser, validateLoginUser, validateJob };
