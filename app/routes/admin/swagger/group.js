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
 *          Edit:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of group
 *                  description:
 *                      type: string
 *                      description: the description of group
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


/**
 * @swagger
 *  /group/get:
 *      get:
 *          tags: [Grouping-Product]
 *          summary: get grouping
 *          description: Product grouping can be get in this section
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
 *  /group/edit/{id}:
 *      patch:
 *          tags: [Grouping-Product]
 *          summary: update group by id 
 *          consumes: 
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit'
 *          responses:
 *              200:
 *                  description: success
 */