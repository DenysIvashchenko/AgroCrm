import { Observable } from "rxjs";
import { Field } from "../../../shared/models";

export abstract class FieldRepository {
    abstract getFields(): Observable<Field[]>;
}