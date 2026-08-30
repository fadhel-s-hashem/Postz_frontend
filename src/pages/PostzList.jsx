

const PostzList = (props) => {

    return(
        <section>
           <h1>All Postz</h1>
           {props.postz.map((post) => (
            <article>
                <h2 postzTitle> {post.title} </h2>
                <p className="postz-author">Posted by {post.author?.username || 'Unknown user'}</p>
                <p className="postzText">{post.text}</p>

                <footer>
                <span>
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span>
                    {post.comments?.length || 0} comments
                </span>
                </footer>
                <hr />
            </article>
           ))}

        </section>
    )
}


export default PostzList