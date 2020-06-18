import axios from "axios";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { Component, default as React } from "react";
import { Link, Route, Switch, RouteComponentProps } from "react-router-dom";
import { IfAdmin } from "../Conditional/If";
import { LoadData } from "../LoadData/LoadData";
import Blog, { IBlogAttributes } from "../../Models/Blog";
import Project from '../../Models/Project';
import ProjectList from './ProjectList';
import BlogCategoryEditPage from '../../Pages/Blog/BlogCategoryEditPage';

@observer
export default class ProjectListPage extends Component {
	@observable
	projectList: Project[] = [];

	render() {
		return (
			<>
				<Switch>
					<Route exact path="/Project">
						<div>
							<h1>Projects</h1>
							<LoadData
								promise={axios.get("/Api/Project")}
								done={(data) => {
									let a: Project[] = data.data.map((x: any) => new Project(x));
									return <ProjectList list={a} />;
								}}
							/>
							<ul>
								<IfAdmin>
									<Link to="/project/create">Add Project</Link>
								</IfAdmin>
							</ul>
						</div>
					</Route>
					<Route path="/Project/create">
						<p>Lets create a project dog</p>
						{/* <BlogCreatePage entityAction={"Create"} /> */}
					</Route>
					<Route path="/Project/:id?" component={BlogCategoryEditPage} />
				</Switch>
			</>
		);
	}
}

interface IBlogListProps {
	blogList: Blog[];
}

@observer
class BlogList extends Component<IBlogListProps> {
	@observable
	blogList: Blog[] = this.props.blogList;

	@action
	onDelete = (title: string, id: string) => {
		let accepted = window.confirm(`Are you sure you wish to delete: ${title}?`);

		if (accepted) {
			axios
				.delete(`/Api/Blog/${id}`)
				.then((response) => {
					console.log(response);
					this.blogList = this.blogList.filter((b) => b.id != id);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	render() {
		return (
			<div className="blog-items">
				{this.blogList.map((b) => (
					<BlogListItem {...b} onItemRemoved={this.onDelete} />
				))}
			</div>
		);
	}
}

interface IBlogItemProps extends IBlogAttributes {
	onItemRemoved: Function;
}

@observer
class BlogListItem extends Component<IBlogItemProps> {
	render() {
		return (
			<div className="blog-item">
				<Link to={`/blog/${this.props.id}`}>{this.props.title}</Link>
				<IfAdmin>
					<img
						src="/Icons/bin-icon.svg"
						onClick={() =>
							this.props.onItemRemoved(this.props.title, this.props.id)
						}
					/>
				</IfAdmin>
				<Link to={`/blog/update/${this.props.id}`}>Update</Link>
			</div>
		);
	}
}
