from services.aggregates.price_item.repository import PriceItemRepository
from services.aggregates.price_list.repository import PriceListRepository
from services.controllers.base import UseCaseController
from services.use_case.add_three_price_item_uc import AddThreePriceItemUseCase
from services.use_case.base.uc_changed import AddThreePriceItemUseCaseChanged
from services.use_case.base.uc_init import AddThreePriceItemUseCaseInit


class AddThreePriceItemController(UseCaseController):
    use_case_class = AddThreePriceItemUseCase

    def __init__(self, session, name: str, shirt_price: int,
                 middle_price: int, long_price: int,
                 price_list_id: int, description: str = ''):
        super().__init__(session=session)

        self._name = name
        self._shirt_price = shirt_price
        self._middle_price = middle_price
        self._long_price = long_price
        self._description = description
        self._price_list_id = price_list_id

    def __get_price_list(self):
        repo = PriceListRepository(self.session)
        return repo.get(pk=self._price_list_id)

    def _get_use_case_init(self):
        return AddThreePriceItemUseCaseInit(
            name=self._name,
            shirt_price=self._shirt_price,
            middle_price=self._middle_price,
            long_price=self._long_price,
            description=self._description,
            price_list=self.__get_price_list(),
        )

    def _save_use_case_result(self, use_case_changed: AddThreePriceItemUseCaseChanged):
        repo = PriceItemRepository(self.session)

        for price_item in use_case_changed.price_items:
            repo.create_with_price_list(price_item, use_case_changed.price_list)
