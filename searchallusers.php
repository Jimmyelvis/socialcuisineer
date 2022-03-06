<?php

include("includes/header.php");
if (isset($_GET['q'])) {
    $query = $_GET['q'];
} else {
    $query = "";
}

if (isset($_GET['type'])) {
    $type = $_GET['type'];
} else {
    $type = "name";
}

?>

<div class="container resultsContainer">

    <?php

    $header = "";
    $mutual_friends = "";


    if ($query == "") {

        $header = "
        <div class='resultsHeading'>
            <h3 class='heading-3'>
                You must enter something in the search box.
            </h3>
        </div>";

        echo $header;
    } else {

        //If query contains an underscore, assume user is searching for usernames
        if ($type == "username") {
            $usersReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE username LIKE '$query%' AND user_closed='no' LIMIT 8");
        } else {
            $names = explode(" ", $query);

            //If there are two words, assume they are first and last names respectively
            if (count($names) == 3) {
                $usersReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE (first_name LIKE '$names[0]%' AND last_name LIKE '$names[2]%') AND user_closed='no'");
            }

            //If query has one word only, search first names or last names
            elseif (count($names) == 2) {
                $usersReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE (first_name LIKE '$names[0]%' AND last_name LIKE '$names[1]%') AND user_closed='no'");
            } else {
                $usersReturnedQuery = mysqli_query($con, "SELECT * FROM users WHERE (first_name LIKE '$names[0]%' OR last_name LIKE '$names[0]%') AND user_closed='no'");
            }
        }

        //Check if results were found

        if (mysqli_num_rows($usersReturnedQuery) == 0) {
            $header = "
                <div class='resultsHeading'>
                    <h3 class='heading-3'>
                        We can't find anyone with a  $type  like:  $query
                    </h3>
                </div>";
            echo $header;
        } else {
            $number = mysqli_num_rows($usersReturnedQuery);

            $header = "
                <div class='resultsHeading'>
                    <h3 class='heading-3 resultsFound'>
                        $number Results Found
                    </h3>

                     <h3 class='heading-3 try'>Try searching for:</h3>
                     
                     <div class='searchOptions'>
                        <a href='searchallusers.php?q=" . $query . "&type=name'>Names</a>
                        <a href='searchallusers.php?q=" . $query . "&type=username'>Usernames</a>
                    </div>
                </div>";

            echo $header;
        }
    ?>


        <div class="queryResultsUsers">

            <?php while ($row = mysqli_fetch_array($usersReturnedQuery)) { ?>

                <div class="queryResult">

                    <div class="avatar">
                        <a href="<?php echo $row['username']  ?>">
                            <img src="<?php echo $row['profile_pic'] ?>" alt="">
                        </a>
                    </div>

                    <div class="details">
                        <li class="fullname"><?php echo $row['first_name'] ?> <?php echo $row['last_name'] ?></li>
                        <li class="username"><?php echo $row['username'] ?></li>
                        <li>
                            <?php
                            $mutual_friends = $user_obj->getMutualFriends($row['username']);
                            echo "<h4 class='heading-4'>Mutual Friends: $mutual_friends</h4>";
                            ?>
                        </li>

                    </div>

                </div>

        <?php }
        }

        ?>

        </div>




</div>

<?php

include("includes/footer.php");

?>