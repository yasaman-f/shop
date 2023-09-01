/**
 * @swagger
 *  components:
 *      schemas:
 *          SignUp:
 *              type: object
 *              required:
 *                  -   username
 *                  -   mobile
 *                  -   email
 *                  -   password
 *              properties:
 *                  username:
 *                      type: string
 *                      description: the username for signup
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup
 *                  email:
 *                      type: string
 *                      description: the user email for signup
 *                  password:
 *                      type: string
 *                      description: the user password for signup
 *          Login:
 *              type: object
 *              required:
 *                  -   email
 *                  -   password
 *              properties:
 *                  email:
 *                      type: string
 *                      description: the user email for login
 *                  password:
 *                      type: string
 *                      description: the user password for login
 *
 *          Forget:
 *              type: object
 *              required:
 *                  -   email
 *              properties:
 *                  email:
 *                      type: string
 *                      description: the user email for getOtp
 *          CheckOtp:
 *              type: object
 *              required:
 *                  -   email
 *                  -   code
 *              properties:
 *                  email:
 *                      type: string
 *                      description: the user email for login
 *                  code:
 *                      type: string
 *                      description: the user otp for login
 *          Refresh:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: the user email for login
 */


/**
 * @swagger
 *  /user/sign-up:
 *      post:
 *          tags: [User-Authentication]
 *          summary: sign up user in userpanel
 *          description: sign up user in userpanel
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/SignUp'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SignUp'
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */

/**
 * @swagger
 *  /user/login:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user in userpanel
 *          description: login user in userpanel
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Login'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Login'
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */

/**
 * @swagger
 *  /user/forget:
 *      post:
 *          tags: [User-Authentication]
 *          summary: getOtp code
 *          description: send otpCode for user
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Forget'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Forget'
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */

/**
 * @swagger
 *  /user/checkOtp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: checkOtp code
 *          description: check otp Code for login
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOtp'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOtp'
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */

/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [User-Authentication]
 *          summary: refresh token
 *          description: refresh token for when expire access token
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Refresh'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Refresh'
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */
