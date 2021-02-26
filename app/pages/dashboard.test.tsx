import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { render } from "test/utils"

import Dashboard from "./dashboard"

jest.mock("app/core/hooks/useCurrentUser")
const mockUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>

test("renders username on dashboard", async () => {
    mockUseCurrentUser.mockReturnValue({
        id: 1,
        name: "User",
        email: "user@email.com",
        role: "user",
        profile_picture:
            "https://pbs.twimg.com/profile_images/749669380955447296/IPzukly4_normal.jpg",
    })

    const { findByText } = render(<Dashboard />)
    const email = await findByText(/user@email.com/i)
    expect(email).toBeInTheDocument()
})
