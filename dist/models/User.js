var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "../supabaseClient";
export class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    getTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase
                .from("transactions")
                .select("*")
                .eq("user_id", this.id);
            if (error)
                throw new Error(error.message);
            return data !== null && data !== void 0 ? data : [];
        });
    }
    getBudgets() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase
                .from("budgets")
                .select("*")
                .eq("user_id", this.id);
            if (error)
                throw new Error(error.message);
            return data !== null && data !== void 0 ? data : [];
        });
    }
    getPots() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase
                .from("pots")
                .select("*")
                .eq("user_id", this.id);
            if (error)
                throw new Error(error.message);
            return data !== null && data !== void 0 ? data : [];
        });
    }
    getBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = yield this.getTransactions();
            const total = transactions.reduce((sum, t) => sum + t.amount, 0);
            return { total };
        });
    }
}
//# sourceMappingURL=User.js.map