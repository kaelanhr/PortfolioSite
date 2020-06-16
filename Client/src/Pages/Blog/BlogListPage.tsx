import axios from "axios";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { Component, default as React } from "react";
import { Link, Route, Switch, RouteComponentProps } from "react-router-dom";
import { IfAdmin } from "../../Components/Conditional/If";
import { LoadData } from "../../Components/LoadData/LoadData";
import Blog, { IBlogAttributes } from "../../Models/Blog";
import BlogCreatePage from "./BlogCategoryCreatePage";
import BlogEntity from "./BlogPostCreatePage";
import BlogCategoryEditPage from "./BlogCategoryEditPage";

@observer
export default class BlogPage extends Component {
	@observable
	blogList: Blog[] = [];

	render() {
		return (
			<>
				<Switch>
					<Route exact path="/blog">
						<div>
							<h1>Blog</h1>
							<LoadData
								promise={axios.get("/Api/Blog")}
								done={(data) => {
									this.blogList = data.data.map((x: any) => new Blog(x));
									return <BlogList blogList={this.blogList} />;
								}}
							/>
							<ul>
								<IfAdmin>
									<Link to="/blog/category/create">Create Blog</Link>
									<Link to="/blog/update">Update Blog</Link>
								</IfAdmin>
							</ul>
						</div>
					</Route>
					<Route path="/blog/category/create">
						<BlogCreatePage entityAction={"Create"} />
					</Route>
					<Route
						path="/blog/update/:id?"
						component={BlogCategoryEditPage}
					/>
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
