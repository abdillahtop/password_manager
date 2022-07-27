import * as joi from 'joi';

export class UsersModel {
  public static validateGetUsers = (requestBody: any) => {
    const validate = {
      page: joi.string().optional().allow(null, ''),
      limit: joi.string().optional().allow(null, ''),
      sort: joi.string().optional().allow(null, ''),
      search: joi.string().optional().allow(null, ''),
      secure: joi.boolean().default(true),
    };
    return this.validatePayload(requestBody, validate);
  };

  public static validateInsertUser = (requestBody: any) => {
    const validate = {
      username: joi.string().max(100).required(),
      name: joi.string().max(100).required(),
      is_deleted: joi.boolean().default(false),
    };
    return this.validatePayload(requestBody, validate);
  };

  public static validateInsertPasswordUser = (requestBody: any) => {
    const validate = {
      username: joi.string().max(100).required(),
      password: joi.string().max(100).required(),
      is_deleted: joi.boolean().default(false),
    };
    return this.validatePayload(requestBody, validate);
  };

  public static validateUpdatePasswordUser = (requestBody: any) => {
    const validate = {
      username: joi.string().max(100).required(),
      password: joi.string().max(100).required(),
    };
    return this.validatePayload(requestBody, validate);
  };

  public static validateDeletePasswordUser = (requestBody: any) => {
    const validate = {
      username: joi.string().max(100).required(),
    };
    return this.validatePayload(requestBody, validate);
  };

  private static validatePayload = (requestBody, validate: any) => {
    const requiredRequestBody = joi.object().required().keys(validate);

    const validateRequestBody = requiredRequestBody.validate(requestBody, {
      allowUnknown: false,
    });
    
    return validateRequestBody;
  };
}
