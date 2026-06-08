const Scholarship = artifacts.require("Scholarship");

contract("Scholarship", accounts => {
  let scholarshipInstance;
  const admin = accounts[0];
  const donor = accounts[1];
  const applicant = accounts[2];

  beforeEach(async () => {
    scholarshipInstance = await Scholarship.new({ from: admin });
  });

  it("should set the admin correctly", async () => {
    const currentAdmin = await scholarshipInstance.admin();
    assert.equal(currentAdmin, admin, "Admin was not set correctly");
  });

  it("should allow donations", async () => {
    const donationAmount = web3.utils.toWei("1", "ether");
    await scholarshipInstance.donate({ from: donor, value: donationAmount });
    const totalDonations = await scholarshipInstance.totalDonations();
    assert.equal(totalDonations.toString(), donationAmount, "Donation was not recorded correctly");
  });

  it("should allow applications", async () => {
    await scholarshipInstance.applyForScholarship({ from: applicant });
    const hasApplied = await scholarshipInstance.applicants(applicant);
    assert.equal(hasApplied, true, "Application was not recorded correctly");
  });

  it("should allow admin to release funds", async () => {
    const donationAmount = web3.utils.toWei("2", "ether");
    const releaseAmount = web3.utils.toWei("1", "ether");
    await scholarshipInstance.donate({ from: donor, value: donationAmount });

    const initialBalance = await web3.eth.getBalance(applicant);
    await scholarshipInstance.releaseFunds(applicant, releaseAmount, { from: admin });
    const finalBalance = await web3.eth.getBalance(applicant);

    const diff = web3.utils.toBN(finalBalance).sub(web3.utils.toBN(initialBalance));
    assert.equal(diff.toString(), releaseAmount, "Funds were not released correctly");
  });

  it("should NOT allow non-admin to release funds", async () => {
    try {
      await scholarshipInstance.releaseFunds(applicant, web3.utils.toWei("1", "ether"), { from: donor });
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.include(error.message, "Only admin can release funds", "Error message was incorrect");
    }
  });
});
