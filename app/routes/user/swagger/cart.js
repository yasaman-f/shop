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
