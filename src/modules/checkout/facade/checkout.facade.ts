import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PlaceOrderFacadeInterface, { PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto } from "./facade.interface";

export default class CheckoutFacade implements PlaceOrderFacadeInterface {
    private _placeOrderUseCase: UseCaseInterface;
    constructor(placeOrderUseCase: UseCaseInterface) {
        this._placeOrderUseCase = placeOrderUseCase;
    }

    process(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto> {
        return this._placeOrderUseCase.execute(input);
    }
}