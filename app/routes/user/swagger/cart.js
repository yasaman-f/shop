/**
 * @swagger
 *  components:
 *      schemas:
 *          Color:
 *              type: array
 *              items: 
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray                
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 *                      -   purple
 *                      -   yellow
 *                      -   pink
 */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddCart:
 *              type: object
 *              required:
 *                  -   productID
 *                  -   count
 *                  -   colors
 *              properties:
 *                  productID:
 *                      type: string
 *                      description: the productID for cart
 *                  count:
 *                      type: number
 *                      description: the count of product for cart
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          EditCart:
 *              type: object
 *              properties:
 *                  count:
 *                      type: number
 *                      description: the count of product for cart
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 */

/**
 * @swagger
 *  /basket/add:
 *      post:
 *          tags: [Cart]
 *          summary: add product to cart
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddCart'
 *          
 *          responses:
 *              200:
 *                  description:  add product to cart
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/AddCart'
 */

/**
 * @swagger
 *  /basket/getBasket/{userID}:
 *      get:
 *          tags: [Cart]
 *          summary: update cart by id 
 *          consumes: 
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: userID
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /basket/edit/{id}:
 *      patch:
 *          tags: [Cart]
 *          summary: edit product in cart
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
 *                          $ref: '#/components/schemas/EditCart'
 *          
 *          responses:
 *              200:
 *                  description:  edit product in cart
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/EditCart'
 */

/**
 * @swagger
 *  /basket/remove/{id}:
 *      delete:
 *          tags: [Cart]
 *          summary: delete product of cart by id 
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
