from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
import time



driver = webdriver.Chrome(executable_path="./chromedriver")
driver.get("https://internchallenge.morganstanley.co.jp/")
actionChains = ActionChains(driver)


for i in range(100,200):
    algorithm_button = driver.find_element_by_id("console-button")
    algorithm_button.click()
    seed_box = driver.find_element_by_id("custom-seed-input")
    seed_box.send_keys(i)
    time.sleep(1)
    driver.find_element_by_link_text('適用').click()
    # seed_button = driver.find_element_by_id("custom-seed-button")
    # seed_button.click()
    time.sleep(3)
    driver.find_element_by_link_text('スクリプト実行').click()
    #execute_button = driver.find_element_by_id("execute-button")
    #execute_button.click()

    # ポップアップをクローズ
    # webdriver.ActionChains(driver).send_keys(Keys.ESCAPE).perform()
    # actionChains.key_down(Keys.ESCAPE).perform()
    # driver.find_element_by_id('light-overlay').send_keys(Keys.ESCAPE)
    time.sleep(3)  # 5秒まってみる
    # element = WebDriverWait(driver, 10).until(
    #     expected_conditions.presence_of_element_located((By.ID, "modal-dialog"))
    # )

    # driver.find_element_by_id('light-overlay').click
    # driver.find_element_by_id('main-body').click
    #driver.find_element_by_id('modal-dialog').send_keys(Keys.ESCAPE)
    # driver.find_element_by_tag_name('body').send_keys(Keys.ESCAPE)
    file_name = 'seed_{0}.png'.format(i)
    driver.save_screenshot(file_name)
    driver.refresh()


#custom-seed-button
# 結果を取得


# 結果をリストに格納

# 1番結果の大きくなるseed番号を出力
