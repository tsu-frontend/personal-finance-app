import { User } from "./models/User";
import { OverviewPage } from "./pages/overviewPage";

const user = new User("some-user-id", "Elene", "elene@example.com");

const page = new OverviewPage(user);
page.render();
