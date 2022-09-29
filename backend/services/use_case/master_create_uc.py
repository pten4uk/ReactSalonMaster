from services.aggregates.master.entity import Master
from services.use_case.base import UseCase
from services.use_case.base.uc_changed import MasterCreateUseCaseChanged
from services.use_case.base.uc_init import MasterCreateUseCaseInit
from services.use_case.response.response_core import MasterCreateUseCaseResponse


class MasterCreateUseCase(UseCase):
    _init: MasterCreateUseCaseInit
    response_class = MasterCreateUseCaseResponse

    def __init__(self, init: MasterCreateUseCaseInit):
        super().__init__(init)

    def _check_can_create_master(self):
        assert self._init.name is not None and self._init.last_name is not None, (
            'При инициализации переданы не все обязательные атрибуты'
        )

    def _create_master(self):
        master = Master(name=self._init.name, last_name=self._init.last_name)
        self.changed_entities = MasterCreateUseCaseChanged(master=master)

    def _perform_run(self):
        self._check_can_create_master()
        self._create_master()
