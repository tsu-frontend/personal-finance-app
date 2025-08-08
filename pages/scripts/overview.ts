import { User } from "../../scripts/models/User";
import { OverviewPage } from "../../scripts/pages/overviewPage";


const dummyUser = new User("some-user-id", "Elene", "elene@example.com");
const page = new OverviewPage(dummyUser);

page.render();
