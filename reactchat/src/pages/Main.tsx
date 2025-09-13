import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

const Main = () => {    
    const theme = useTheme()

    return (
        <Box 
        sx={{
            display:"flex",
            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
            mt: `${theme.primaryAppBar.height}px`,  
            overflow: "auto",    
            }}
        >
            {[...Array(100)].map((_, i) => (
                <Typography key={i} paragraph>
                    {i + 1}
                </Typography>
            ))}

        </Box>
    )
}

export default Main