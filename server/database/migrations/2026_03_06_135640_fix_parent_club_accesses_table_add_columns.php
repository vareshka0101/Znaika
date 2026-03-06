<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('parent_club_accesses', function (Blueprint $table) {

            if (!Schema::hasColumn('parent_club_accesses', 'user_id')) {
                $table->foreignId('user_id')->after('id')->constrained()->onDelete('cascade');
            }
            if (!Schema::hasColumn('parent_club_accesses', 'has_access')) {
                $table->boolean('has_access')->default(false)->after('user_id');
            }
            if (!Schema::hasColumn('parent_club_accesses', 'accessed_at')) {
                $table->timestamp('accessed_at')->nullable()->after('has_access');
            }
        });
    }

    public function down()
    {
        Schema::table('parent_club_accesses', function (Blueprint $table) {

            if (Schema::hasColumn('parent_club_accesses', 'user_id')) {
                $table->dropForeign(['user_id']);
                $table->dropColumn('user_id');
            }
            if (Schema::hasColumn('parent_club_accesses', 'has_access')) {
                $table->dropColumn('has_access');
            }
            if (Schema::hasColumn('parent_club_accesses', 'accessed_at')) {
                $table->dropColumn('accessed_at');
            }
        });
    }
};
