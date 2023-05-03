export class ReplyResponseDto {
    id: string
    content: string
    recipe: string
    user: string
    likes: string[]

    constructor(id: string, content: string, user: string, likes: string[]) {
        this.id = id
        this.content = content
        this.user = user
        this.likes = likes
    }
}