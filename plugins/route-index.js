
'use strict'

module.exports = function(ext) {

let publicApis = ext.publicApis

publicApis.push(

{
	url: '/public-cats'
	,method: 'post'
	,name: 'public-cats'
	,desc: ''
	,lib: 'route/public-page'
	,func: 'publicCats'
}
,
{
	url: '/public-posts'
	,method: 'post'
	,name: 'public-posts'
	,desc: ''
	,lib: 'route/public-page'
	,func: 'publicPosts'
}

)

let extend = {
	publicApis: publicApis
}

return extend

////end
}
