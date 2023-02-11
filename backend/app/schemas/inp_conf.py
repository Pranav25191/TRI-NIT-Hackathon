from pydantic import BaseModel
from typing  import List


class RuleDict:
    key: str
    match: int

class Rules:
    result: List[RuleDict]