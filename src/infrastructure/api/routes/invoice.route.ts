import express, { Request, Response } from 'express';
import InvoiceFacadeFactory from '../../../modules/invoice/factory/facade.factory';

export const invoiceRoute = express.Router();

invoiceRoute.get('/:id', async (req: Request, res: Response) => {
    try {
        const facade = InvoiceFacadeFactory.create();
        const invoice = await facade.findInvoice({ id: req.params.id });
        res.json(invoice);
    } catch (error) {
        res.status(404).json(error);
    }
});