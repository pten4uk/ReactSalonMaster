from services.aggregates.price_list.entity import PriceList
from services.use_case.base import UseCase, UseCaseException
from services.use_case.base.uc_changed import AddPriceListUseCaseChanged
from services.use_case.base.uc_init import AddPriceListUseCaseInit
from services.use_case.response.response_core import AddPriceListUseCaseResponse


class AddPriceListUseCase(UseCase):
    _init: AddPriceListUseCaseInit
    response_class = AddPriceListUseCaseResponse

    def __init__(self, init: AddPriceListUseCaseInit):
        super().__init__(init)

    def _perform_run(self):
        if self._init.existing_price_list is not None:
            raise UseCaseException('Категория с таким именем уже существует')

        price_list = PriceList(name=self._init.name.capitalize(), type=self._init.type)
        self.changed_entities = AddPriceListUseCaseChanged(price_list=price_list)
