/**
 * @swagger
 *  components:
 *      schemas:
 *          AddRole:
 *              type: object
 *              required:
 *                  -   role
 *                  -   permission
 *              properties:
 *                  role:
 *                      type: string
 *                      description: the role for user
 *                  permission:
 *                      type: string
 *                      description: the permission for user
 *          GiveRole:
 *              type: object
 *              required:
 *                  -   roleID
 *                  -   userID
 *              properties:
 *                  roleID:
 *                      type: string
 *                      description: the roleID for give to user
 *                  userID:
 *                      type: string
 *                      description: the userID for get user
 */

/**
 * @swagger
 *  /role/add:
 *      post:
 *          tags: [Role]
 *          summary: add role
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddRole'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddRole'
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
 *  /role/listOfRole:
 *      get:
 *          tags: [Role]
 *          summary: get all role
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: Search for roles
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /role/giveRoleToUser:
 *      post:
 *          tags: [Role]
 *          summary: get role for give to user
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GiveRole'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GiveRole'
 *          responses:
 *              200:
 *                  description: success
 */



/**
 * @swagger
 *  /group/remove/{id}:
 *      delete:
 *          tags: [Grouping-Product]
 *          summary: delete group by id 
 *          consumes: 
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */