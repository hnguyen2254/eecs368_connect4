
let colorcount = 0;
let XOval = "";
reset = false;

let counter = 0;
let connectboard = new Array(6); 
for (let i = 0; i < 6; i++) 
{ 
    connectboard[i] = new Array(7);

    for (let j = 0; j < 7; j++) 
    { 
        counter++;
        connectboard[i][j] = {value:document.getElementById("" + counter), row: i+1, column: j+1, taken: false};
    }   
}

function game()
{
    if(reset == true)
    {
        resetgame();
        reset = false;
    }
    //this section checks if a column is full, this is to ensure that clicks after a column is full does not mess up the player order
    let dropdownval = document.getElementById("dropcolumn").options[document.getElementById("dropcolumn").selectedIndex].value;

    let takencount = 0;
    for(let k = 0; k < 6; k++)
    {
        for (let y = 0; y < 7; y++)
        {
            if(connectboard[k][y].column == dropdownval && connectboard[k][y].taken == true)
            {
                takencount++;
            }
        }
    }

    if(takencount == 6)
    {
        return;
    }
    //  
    
    colorcount++;
    if(colorcount % 2 == 0)
    {
        XOval = "X";
    }
    else
    {
        XOval = "O";
    }

    let turns = 1;
    for(let i = 0; i < 6; i++)
    {
        for(let j = 0; j < 7; j++)
        {
            if(connectboard[i][j].column == dropdownval && connectboard[i][j].taken == false && turns == 1)
            {
                connectboard[i][j].taken = true;
                connectboard[i][j].value.innerText = XOval;
                turns++;
            }
        }
    }

    check(XOval);
    //checks here (if four connect for or more is found, alert players and reset board)
    if(colorcount == 42)
    {
        alert("No moves left!");
    }
}


function check(w)//w is X or O input
{
    //check the whole array for a connect four
    //horizontal check
    /*for (let i = 0; i < 6; i++) 
    {
        let horizontal = 0;

        for (let j = 0; j < 6; j++) 
        {
            if(w == connectboard[i][j].value.innerText && w == connectboard[i][j+1].value.innerText && connectboard[i][3].value.innerText == w)
            {
                horizontal++;
            }
        }
        if(horizontal >= 3 )
        {
            alert("Connect 4 for team " + w + "!!! Horizontal Connect 4");
            alert("Game will now be reset. Select desired column for new game and click submit.");
            reset = true;
        }
    }*/
    for (let i = 0; i < 6; i++) 
    {
        for(let j = 0; j < 4; j++)
        {
            if(w == connectboard[i][j].value.innerText && w == connectboard[i][j+1].value.innerText && w == connectboard[i][j+2].value.innerText && w == connectboard[i][j+3].value.innerText)
            {
                alert("Connect 4 for team " + w + "!!! Horizontal Connect 4");
                alert("Game will now be reset. Select desired column for new game and click submit.");
                reset = true;
                return;
            }
        }
        
    }
    //vertical check
    for (let j = 0; j < 7; j++) 
    {
        let vertical = 0;

        for (let i = 0; i < 5; i++) 
        {
            if(w == connectboard[i][j].value.innerText && w == connectboard[i+1][j].value.innerText && connectboard[2][j].value.innerText == w && connectboard[3][j].value.innerText == w)
            {
                vertical++;
            }
        }

        if(vertical >= 3)
        {
            alert("Connect 4 for team " + w + "!!! Vertical Connect 4");
            alert("Game will now be reset. Select desired column for new game and click submit.");
            reset = true;
        }
    }

    //top left to bottom right diagonal
    for(let i = 5; i >= 3; i--)
    {
        let downTrendDiagonal1 = 0;
        let j = i;
        for(let c = 0; c <= j-1; c++)//could i just remove j altogether? i think so cuz i can just replace it with i.
        {
            if(i == 5)
            {
                if(w == connectboard[i-c][c].value.innerText && w == connectboard[i-c-1][c+1].value.innerText && w == connectboard[3][2].value.innerText && w == connectboard[2][3].value.innerText)
                {
                    downTrendDiagonal1++;
                }
            }
            else
            {
                if(w == connectboard[i-c][c].value.innerText && w == connectboard[i-c-1][c+1].value.innerText)
                {
                    downTrendDiagonal1++;
                }
            }
            
        }

        if(downTrendDiagonal1 >= 3)
        {
            alert("Connect 4 for team " + w + "!!! Diagonal Connect 4");
            alert("Game will now be reset. Select desired column for new game and click submit.");
            reset = true;
        }
    }
    
    for(let j = 1; j <= 3; j++)
    {
        let downTrendDiagonal2 = 0;
        for(let i = 5; i > j-1; i--)
        {
            if(j == 1)
            {
                if(w == connectboard[i][6-i+j-1].value.innerText && w == connectboard[i-1][6-i+1+j-1].value.innerText && w == connectboard[3][3].value.innerText && w == connectboard[2][4].value.innerText)
                {
                    downTrendDiagonal2++;
                }
            }
            else
            {
                if(w == connectboard[i][6-i+j-1].value.innerText && w == connectboard[i-1][6-i+1+j-1].value.innerText)
                {
                    downTrendDiagonal2++;
                }
            }
            
        }

        if(downTrendDiagonal2 >= 3)
        {
            alert("Connect 4 for team " + w + "!!! Diagonal Connect 4");
            alert("Game will now be reset. Select desired column for new game and click submit.");
            reset = true;
        }
    }

    //bottom left to top right diagonal
    for (let i = 0; i <= 2; i++) 
    {
        let s = i;
        let k = i + 1;
        let upTrendDiagonal1 = 0;
        for(let j = 0; j <= 6-i-2; j++)
        {   
            if(i == 0)
            {
                if(w == connectboard[s][j].value.innerText && w == connectboard[k][j+1].value.innerText && w == connectboard[3][3].value.innerText && w == connectboard[2][2].value.innerText)
                {
                    upTrendDiagonal1++;
                }
                s++;
                k++;
            }
            else
            {
                if(w == connectboard[s][j].value.innerText && w == connectboard[k][j+1].value.innerText)
                {
                    upTrendDiagonal1++;
                }
                s++;
                k++;
            }
            
        }

        if(upTrendDiagonal1 >= 3)
        {
            alert("Connect 4 for team " + w + "!!! Diagonal Connect 4");
            alert("Game will now be reset. Select desired column for new game and click submit.");
            reset = true;
        }
    }

    for(let j = 1; j <= 3; j++)
    {
       let upTrendDiagonal2 = 0;
       let b = j;
       
        for(let i = 0; i <= 6-j-1; i++)
        {
            if(j == 1)
            {
                if(w == connectboard[i][b].value.innerText && w == connectboard[i+1][b+1].value.innerText && w == connectboard[2][3].value.innerText && w == connectboard[3][4].value.innerText)
                {
                    upTrendDiagonal2++;
                }
                b++;
            }
            else
            {
                if(w == connectboard[i][b].value.innerText && w == connectboard[i+1][b+1].value.innerText)
                {
                    upTrendDiagonal2++;
                }
                b++;
            }
            
        }

        if(upTrendDiagonal2 >= 3)
        {
            alert("Connect 4 for team " + w + "!!! Diagonal Connect 4");
            alert("Game will now be reset. Select desired column for new game and click submit.");
            reset = true;
        }
    }
}

function resetgame()
{
    colorcount = 0;
    for(let i = 0; i < 6; i++)
    {
        for(let j = 0; j < 7; j++)
        {
            connectboard[i][j].value.innerText = "-";
            connectboard[i][j].taken = false;
        }
    }
}



