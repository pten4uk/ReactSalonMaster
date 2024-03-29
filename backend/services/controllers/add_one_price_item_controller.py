from services.aggregates.price_item.repository import PriceItemRepository
from services.aggregates.price_list.repository import PriceListRepository
from services.controllers.base import UseCaseController
from services.use_case.add_one_price_item_uc import AddOnePriceItemUseCase
from services.use_case.base.uc_changed import AddOnePriceItemUseCaseChanged
from services.use_case.base.uc_init import AddOnePriceItemUseCaseInit


class AddOnePriceItemController(UseCaseController):
    use_case_class = AddOnePriceItemUseCase

    def __init__(self, session, name: str, price: int, price_list_id: int,  description: str = ''):
        super().__init__(session=session)

        self._name = name
        self._price = price
        self._description = description
        self._price_list_id = price_list_id

    def __get_price_list(self):
        repo = PriceListRepository(self.session)
        return repo.get(pk=self._price_list_id)

    def _get_use_case_init(self):
        return AddOnePriceItemUseCaseInit(
            name=self._name,
            price=self._price,
            description=self._description,
            price_list=self.__get_price_list(),
        )

    def _save_use_case_result(self, use_case_changed: AddOnePriceItemUseCaseChanged):
        repo = PriceItemRepository(self.session)
        repo.create_with_price_list(use_case_changed.price_item, use_case_changed.price_list)
