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
 *          Product:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   shortDescription
 *                  -   longDescription
 *                  -   group
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                  shortDescription:
 *                      type: string
 *                      description: the title of product
 *                  longDescription:
 *                      type: string
 *                      description: the title of product
 *                  group:
 *                      type: string
 *                      description: the title of product
 *                      example: 64e5034202ee88b102b061b2
 *                  price:
 *                      type: string
 *                      description: the title of product
 *                      example: 39000000
 *                  discount:
 *                      type: string
 *                      description: the title of product
 *                      example: 0
 *                  count:
 *                      type: string
 *                      description: the title of product
 *                      example: 100
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: string
 *                      description: the height of product 
 *                  weight:
 *                      type: string
 *                      description: the weight of product 
 *                  width:
 *                      type: string
 *                      description: the with of product 
 *                  length:
 *                      type: string
 *                      description: the length of product 
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 *                      
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Product:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                  shortDescription:
 *                      type: string
 *                      description: the title of product
 *                  longDescription:
 *                      type: string
 *                      description: the title of product
 *                  group:
 *                      type: string
 *                      description: the title of product
 *                      example: 64e5034202ee88b102b061b2
 *                  price:
 *                      type: string
 *                      description: the title of product
 *                  discount:
 *                      type: string
 *                      description: the title of product
 *                  count:
 *                      type: string
 *                      description: the title of product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                  width:
 *                      type: string
 *                      description: the with of product packet
 *                  length:
 *                      type: string
 *                      description: the length of product packet
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 *                      
 */

/**
 * @swagger
 *  /product/add:
 *      post:
 *          tags: [Product]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          
 *          responses:
 *              201:
 *                  description: created new Product
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /product/all:
 *      get:
 *          tags: [Product]
 *          summary: get all products
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title of product
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /product/{id}:
 *      get:
 *          tags: [Product]
 *          summary: get products by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: id for get product
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /product/getByUser/{uploader}:
 *      get:
 *          tags: [Product]
 *          summary: get products by uploader
 *          parameters:
 *              -   in: path
 *                  name: uploader
 *                  type: string
 *                  description: user id for get product
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /product/getByGroup/{group}:
 *      get:
 *          tags: [Product]
 *          summary: get products by group
 *          parameters:
 *              -   in: path
 *                  name: group
 *                  type: string
 *                  description: group id for get product
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /product/{id}:
 *      patch:
 *          tags: [Product]
 *          summary: update product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of product for update product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Product'
 *          
 *          responses:
 *              200:
 *                  description: updated Product
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Edit-Product'
 */

/**
 * @swagger
 *  /product/{id}:
 *      delete:
 *          tags: [Product]
 *          summary: delete One products
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of product
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */