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
 *          EditComment:
 *              type: object
 *              properties:
 *                  comment:
 *                      type: string
 *                      description: Edited reply
 */


/**
 * @swagger
 *  /comment/reply/add/{commentID}:
 *      post:
 *          tags: [Answer-Comment]
 *          summary: add reply
 *          consumes: 
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: commentID
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
 *  /comment/reply/edit/{answerID}:
 *      patch:
 *          tags: [Answer-Comment]
 *          summary: edit comment
 *          consumes: 
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: answerID
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
