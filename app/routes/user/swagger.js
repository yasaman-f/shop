
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
 */

/**
 * @swagger
 *  tags:
 *      name : User-Authentication
 *      description : user-auth section
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
