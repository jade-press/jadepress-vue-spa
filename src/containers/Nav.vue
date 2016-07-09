
<template lang="jade">
#nav.col-sm-4.col-md-4.col-lg-3
	.hidden-sm-up.clearfix.p-y-1
		a(v-link='{ path: "/" }') {{glob.siteName}}
		button.navbar-toggler.pull-xs-right(type='button', data-toggle='collapse', data-target='#menus') &#9776;
	nav#menus.collapse
		.p-y-1
		.lists.text-sm-right
			.hidden-sm-down
				a.font-weight-bold.form-control-lg(v-link='{ path: "/" }') {{glob.siteName}}
				hr
			form(action='', onSubmit='search(queryTitle)')
				.form-group
					.input-group
						input.form-control(name='title', type='search', v-model='queryTitle')
						button.btn.btn-secondary(type='submit') search

			div(v-for='cat in cats')
				cat-link(:cat='cat')

		.p-y-1.hidden-sm-up

</template>

<script>
import glob from '../glob'
import CatLink from './CatLink'

export default {
	props: {
		cats: Array
		,search: Function
		,query: Object
	}
	,data: function() {
		return { glob }
	}
	,vuex: {
		actions: {
			updateTitle: ({ dispatch }, value) => {
				dispatch('UPDATE_TITLE', value)
			}
		}
	}
	,computed: {
		queryTitle: {
			get () {
				return this.query.title
			}
			,set (val) {
				this.updateTitle(val)
			}
		}
	}
}
</script>

export default class Nav extends Component {

	render() {

		return (

			<div id="nav" className="col-sm-4 col-md-4 col-lg-3">

				<div className="hidden-sm-up clearfix p-y-1">
					<a href={host} onClick={this.props.onLinkClick.bind(this, {}, '/')}>{siteName}</a>
					<button className="navbar-toggler pull-xs-right" type="button" data-toggle="collapse" data-target="#menus">&#9776;</button>
				</div>

				<nav id="menus" className="collapse">
					<div className="p-y-1" />
					<div className="lists text-sm-right">
						<div className="hidden-sm-down">
							<a href={host} className="font-weight-bold form-control-lg" onClick={this.props.onLinkClick.bind(this, {}, '/')}>{siteName}</a>
							<hr />
						</div>

						<form action={host + '/s'} onSubmit={this.props.onSearch.bind(this)}>
							<div className="form-group">
								<div className="input-group">
									<input className="form-control" name="title" type="search" defaultValue={this.props.query.title} onChange={this.props.onChange.bind(this)} />
									<span className="input-group-btn">
										<button className="btn btn-secondary" type="submit">search</button>
									</span>
								</div>
							</div>
						</form>

						{this.props.cats.map(CatLink(this.props.onLinkClick, this))}
					</div>
					
					<div className="p-y-1 hidden-sm-up" />
				</nav>

			</div>

		)
	}
}