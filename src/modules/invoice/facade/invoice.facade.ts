import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCasePros {
    findInvoiceUseCase: UseCaseInterface;
    generateInvoiceUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findInvoiceUseCase: UseCaseInterface;
    private _generateInvoiceUseCase: UseCaseInterface;

    constructor(useCaseProps: UseCasePros) {
        this._findInvoiceUseCase = useCaseProps.findInvoiceUseCase;
        this._generateInvoiceUseCase = useCaseProps.generateInvoiceUseCase;
    }

    findInvoice(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return this._findInvoiceUseCase.execute(input);
    }

    generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this._generateInvoiceUseCase.execute(input);
    }
}