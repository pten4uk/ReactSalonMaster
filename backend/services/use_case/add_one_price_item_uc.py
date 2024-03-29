from services.aggregates.price_item.entity import PriceItem, PriceItemGroup
from services.aggregates.price_list.entity import PriceListType
from services.use_case.base import UseCase, UseCaseException
from services.use_case.base.uc_changed import AddOnePriceItemUseCaseChanged
from services.use_case.base.uc_init import AddOnePriceItemUseCaseInit
from services.use_case.response.response_core import AddOnePriceItemUseCaseResponse


class AddOnePriceItemUseCase(UseCase):
    _init: AddOnePriceItemUseCaseInit
    response_class = AddOnePriceItemUseCaseResponse

    def __init__(self, init: AddOnePriceItemUseCaseInit):
        super().__init__(init)

    def _validate_data(self):
        if self._init.price_list.type != PriceListType.one_price_item:
            raise UseCaseException('К выбранному прайс листу невозможно добавить элемент c несколькими ценами')
        if len(self._init.name) > 50:
            raise UseCaseException('Максимальная длина названия - 50 символов')
        if type(self._init.price) != int or not (0 < self._init.price < 10000):
            raise UseCaseException('Цена должна быть в диапазоне от 0 до 9999')

    def _perform_run(self):
        self._validate_data()

        price_item = PriceItem(
            name=self._init.name.capitalize(),
            description=self._init.description,
            price=self._init.price,
            price_group=PriceItemGroup.none
        )
        self.changed_entities = AddOnePriceItemUseCaseChanged(price_item=price_item, price_list=self._init.price_list)

