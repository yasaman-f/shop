/**
 * @swagger
 *  components:
 *      schemas:
 *          AddComment:
 *              type: object
 *              required:
 *                  -   comment
 *              properties:
 *                  comment:
 *                      type: string
 *                      description: the comment for product
 *          AddAnswer:
 *              type: object
 *              required:
 *                  -   comment
 *                  -   commentID
 *              properties:
 *                  comment:
 *                      type: string
 *                      description: the comment for product
 *                  commentID:
 *                      type: string
 *                      description: the commentID for answer ago comment
 */

/**
 * @swagger
 *  /comment/add/{productID}:
 *      post:
 *          tags: [Comment]
 *          summary: add comment
 *          consumes: 
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: productID
 *                  type: string
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddComment'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddComment'
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
 *  /comment/add-answer/{productID}:
 *      post:
 *          tags: [Comment]
 *          summary: add answer to comment
 *          consumes: 
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: productID
 *                  type: string
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddAnswer'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddAnswer'
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


