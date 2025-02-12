import express, { Request, Response } from 'express';
import ClientAdmFacadeFactory from '../../../modules/client-adm/factory/client-adm.facade.factory';
import Address from '../../../modules/@shared/domain/value-object/address';

export const clientRoute = express.Router();

clientRoute.post('/', async (req: Request, res: Response) => {
    try {
        const facade = ClientAdmFacadeFactory.create();
        await facade.add({
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: new Address(req.body.street, req.body.number, req.body.complement, req.body.city, req.body.state, req.body.zipCode)
        });
        res.status(201).send();
    } catch (error) {
        res.status(500).send(error);
    }
});