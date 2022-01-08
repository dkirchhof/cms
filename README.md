types
    page
        id: string
        title: string
        content: string

        authorId: connection(page <-> author)
        categories: connection(page <-> category)
    category
        id: string
        name: string

        <!-- pages: connection(page <-> category) -->
    author
        id: string
        name: string

        <!-- pages: connection(page <-> author) -->

connections
    page <-> category: manyToMany
    page <-> author: manyToOne
