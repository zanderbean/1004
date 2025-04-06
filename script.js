<script> /*Navigation pages script*/

function doSomething(contentId) {
    /*Hides page when other button is pressed as to not overlap content*/
    const allContent = document.querySelectorAll('hiddenContent');
    allContent.forEach(content => {
        content.style.display = 'none';
    });

     /*Shows the Page when button is pressed in navbar*/
    const selectedContent = document.getElementById(contentId);
    selectedContent.style.display = 'block';
}

</script>
