import express, { Request, Response } from 'express';
import CheckoutFacadeFactory from '../../../modules/checkout/factory/checkout.facade.factory';


export const checkoutRoute = express.Router();

checkoutRoute.post('/', async (req: Request, res: Response) => {
    try {
        const facade = CheckoutFacadeFactory.create();
        const output = await facade.process({
            clientId: req.body.clientId,
            products: req.body.products
        });
        res.status(201).json(output);
    } catch (err) {
        // Type guard to ensure we can access error properties
        const error = err as Error;
        console.error('Checkout error:', error);
        
        res.status(500).json({
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
            stack: error instanceof Error ? error.stack : undefined
        });
    }
});