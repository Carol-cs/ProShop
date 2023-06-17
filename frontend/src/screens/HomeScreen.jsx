import React from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import products from '../products'

const HomeScreen = () => {
  return (
    <>
        <h1>Latest Products</h1>
        <Row>
            {products.map((product)=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
                {/* on small screen, 1 column  (total 12 grids)
                    on medium screen, 2 columns (6 grids each column)
                    ... */}

                    <Product  product={product}/>
                
                </Col>

            ))}
        </Row>
    </>
  )
}

export default HomeScreen