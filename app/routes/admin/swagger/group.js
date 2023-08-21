/**
 * @swagger
 *  components:
 *      schemas:
 *          Add:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title for add grouping
 *                  description:
 *                      type: string
 *                      description: the description for add grouping
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
 *  /group/add:
 *      post:
 *          tags: [Grouping-Product]
 *          summary: add grouping
 *          description: Product grouping can be added in this section
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Add'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Add'
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
