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
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          EditComment:
 *              type: object
 *              properties:
 *                  comment:
 *                      type: string
 *                      description: the comment for product
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
 *  /comment/edit/{commentID}:
 *      patch:
 *          tags: [Comment]
 *          summary: edit comment
 *          consumes: 
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: commentID
 *                  type: string
 *              -   in: query
 *                  required: false
 *                  name: show
 *                  schema:
 *                    type: boolean
 *                    default: true
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditComment'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EditComment'
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
